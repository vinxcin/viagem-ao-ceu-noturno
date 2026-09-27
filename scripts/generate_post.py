import datetime
from html.parser import HTMLParser
import json
import mimetypes
import os
import random
import time
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, urlopen
from google import genai
from google.genai.errors import ServerError

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def select_strategic_astronomy_topic():
    """
    Seleciona estrategicamente um tema de alto valor fundamentado em:
    - Conceitos do Sistema Solar e curiosidades astronômicas
    - Ferramentas educativas e guias de observação (ex: Stellarium)
    - Etnoastronomia Tupi-Guarani (Cosmovisão ancestral nacional)
    - Astrofísica de vanguarda e astrofotografia com fontes confiáveis
    """
    curated_topics = [
        {
            "category": "Etnoastronomia Tupi-Guarani",
            "title": "O Caminho da Anta e as Constelações Indígenas na Via Láctea",
            "summary": "Exploração da cosmovisão Tupi-Guarani, onde as nuvens escuras de poeira cósmica da Via Láctea formam a grandiosa constelação da Anta (Tapir Itapé), conectando os ciclos sazonais da Terra com o firmamento.",
            "link": "https://www.gov.br/mcti/pt-br",
            "image": "/images/blog/tupi-guarani-cosmos.jpg"
        },
        {
            "category": "Ferramentas Educativas & Observação",
            "title": "Dominando o Céu Noturno: Como Usar o Stellarium para Planejar Suas Observações",
            "summary": "Guia prático sobre o software planetário Stellarium, ensinando entusiastas e educadores a simular o céu em qualquer coordenada da Terra, localizar planetas em oposição e rastrear passagens de satélites.",
            "link": "https://stellarium.org/",
            "image": "/images/blog/stellarium-guide.jpg"
        },
        {
            "category": "Sistema Solar & Curiosidades",
            "title": "Os Segredos Ocultos de Júpiter: Tempestades Gigantes e Suas Luas Galileanas",
            "summary": "Uma análise detalhada sobre o maior planeta do Sistema Solar, sua dinâmica atmosférica extrema, o campo magnético colossal e como observar suas quatro principais luas (Io, Europa, Ganimedes e Calisto) com binóculos ou telescópios.",
            "link": "https://solarsystem.nasa.gov/planets/jupiter/overview/",
            "image": "/images/blog/jupiter-moons.jpg"
        },
        {
            "category": "Astrofotografia & Telescópios",
            "title": "Capturando a Luz da Lua: Técnicas de Astrofotografia Lunar para Iniciantes",
            "summary": "Dicas essenciais de configuração de câmera e acoplamento em telescópios para registrar crateras, mares basálticos e relevos lunares com nitidez impressionante.",
            "link": "https://www.nasa.gov/mission_pages/apollo/revisiting-the-moon/index.html",
            "image": "/images/blog/lunar-astrophotography.jpg"
        },
        {
            "category": "Conceitos Astronômicos & Cosmologia",
            "title": "O Horizonte de Eventos e a Sombra dos Monstros Cósmicos: A Revolução do EHT",
            "summary": "Como a colaboração internacional Event Horizon Telescope uniu radiotelescópios ao redor do planeta para registrar a primeira imagem real de um buraco negro supermassivo.",
            "link": "https://eventhorizontelescope.org/",
            "image": "/images/blog/blackhole-eht.jpg"
        }
    ]

    chosen = random.choice(curated_topics)
    print(f"Tema selecionado estrategicamente [{chosen['category']}]: {chosen['title']}")
    return chosen


class SocialImageParser(HTMLParser):
    """Extrai a imagem de compartilhamento declarada pela página de referência."""

    def __init__(self):
        super().__init__()
        self.image_url = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "meta" or self.image_url:
            return
        values = {key.lower(): value for key, value in attrs if key and value}
        property_name = values.get("property", "").lower()
        name = values.get("name", "").lower()
        if property_name == "og:image" or name in {"twitter:image", "twitter:image:src"}:
            self.image_url = values.get("content")


def download_image(image_url, output_dir, filename_stem):
    """Baixa uma URL de imagem e retorna seu caminho público local."""
    parsed = urlparse(image_url)
    if parsed.scheme == "http":
        # NASA e algumas páginas ainda anunciam imagens por HTTP, embora aceitem HTTPS.
        parsed = parsed._replace(scheme="https")
        image_url = parsed.geturl()
    if parsed.scheme != "https" or not parsed.hostname:
        raise RuntimeError(f"URL de imagem inválida ou insegura: {image_url}")

    request = Request(image_url, headers={"User-Agent": "ViagemAoCeuNoturnoBlog/1.0"})
    with urlopen(request, timeout=30) as response:
        content_type = response.headers.get_content_type()
        if not content_type.startswith("image/"):
            raise RuntimeError(f"A URL retornou conteúdo do tipo {content_type}, não uma imagem.")
        image_bytes = response.read()

    if not image_bytes:
        raise RuntimeError("O arquivo de imagem baixado está vazio.")

    extension = mimetypes.guess_extension(content_type) or Path(parsed.path).suffix or ".jpg"
    if extension == ".jpe":
        extension = ".jpg"
    filename = f"{filename_stem}{extension}"
    output_path = output_dir / filename
    output_path.write_bytes(image_bytes)
    return f"/images/blog/{filename}"


def extract_source_image(topic, output_dir):
    """Tenta usar a imagem OG/Twitter da própria página que serve de referência."""
    request = Request(topic["link"], headers={"User-Agent": "Mozilla/5.0 (compatible; BlogAstral/1.0)"})
    with urlopen(request, timeout=20) as response:
        content_type = response.headers.get_content_type()
        if "html" not in content_type:
            raise RuntimeError(f"A fonte não retornou uma página HTML ({content_type}).")
        html = response.read(2_000_000).decode(response.headers.get_content_charset() or "utf-8", errors="replace")

    parser = SocialImageParser()
    parser.feed(html)
    if not parser.image_url:
        raise RuntimeError("A página de referência não declara og:image nem twitter:image.")

    image_url = urljoin(topic["link"], parser.image_url)
    topic["image"] = download_image(image_url, output_dir, Path(topic["image"]).stem)
    topic["image_alt"] = f"Imagem da página de referência sobre {topic['category']}"
    topic["image_source"] = topic["link"]
    return topic


def download_nasa_image(topic, output_dir):
    """Busca uma imagem ilustrativa na NASA como alternativa à imagem da fonte."""
    filename_stem = Path(topic["image"]).stem

    query_by_category = {
        "Etnoastronomia Tupi-Guarani": "Milky Way night sky",
        "Ferramentas Educativas & Observação": "star field night sky",
        "Sistema Solar & Curiosidades": "Jupiter planet",
        "Astrofotografia & Telescópios": "Moon surface",
        "Conceitos Astronômicos & Cosmologia": "black hole galaxy",
    }

    def get_json(url):
        request = Request(url, headers={"User-Agent": "ViagemAoCeuNoturnoBlog/1.0"})
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))

    try:
        query = query_by_category.get(topic["category"], "astronomy space")
        search_url = "https://images-api.nasa.gov/search?" + urlencode({
            "q": query,
            "media_type": "image",
            "page_size": 10,
        })
        results = get_json(search_url).get("collection", {}).get("items", [])
        if not results:
            fallback_url = "https://images-api.nasa.gov/search?" + urlencode({
                "q": "astronomy stars galaxy",
                "media_type": "image",
                "page_size": 10,
            })
            results = get_json(fallback_url).get("collection", {}).get("items", [])
        if not results:
            raise RuntimeError("A busca na NASA não retornou imagens.")

        nasa_id = results[0].get("data", [{}])[0].get("nasa_id")
        if not nasa_id:
            raise RuntimeError("O resultado da NASA não contém um identificador de imagem.")

        assets = get_json(f"https://images-api.nasa.gov/asset/{nasa_id}").get("collection", {}).get("items", [])
        image_url = next(
            (item.get("href") for item in assets if item.get("href", "").endswith(("~medium.jpg", "~large.jpg"))),
            None,
        )
        if not image_url:
            image_url = next((item.get("href") for item in assets if item.get("href", "").lower().endswith((".jpg", ".jpeg", ".png"))), None)
        if not image_url:
            raise RuntimeError(f"A NASA não retornou arquivo de imagem compatível para {nasa_id}.")

        topic["image"] = download_image(image_url, output_dir, filename_stem)
        topic["image_alt"] = f"Imagem ilustrativa relacionada a {topic['category']}"
        topic["image_source"] = f"https://images.nasa.gov/details/{nasa_id}"
        print(f"Imagem ilustrativa baixada da NASA: {topic['image']} (NASA ID: {nasa_id})")
    except Exception as e:
        raise RuntimeError(f"Não foi possível obter uma imagem alternativa da NASA: {e}") from e

    return topic


def download_topic_image(topic):
    """Prefere a imagem da fonte do conteúdo e recorre à NASA se necessário."""
    output_dir = Path("public/images/blog")
    output_dir.mkdir(parents=True, exist_ok=True)
    try:
        topic = extract_source_image(topic, output_dir)
        print(f"Imagem extraída da fonte do conteúdo: {topic['image']}")
        return topic
    except Exception as e:
        print(f"Não foi possível extrair imagem da fonte ({e}). Usando imagem alternativa da NASA...")
        return download_nasa_image(topic, output_dir)

def generate_blog_post(topic):
    prompt = f"""
    ### Papel e Identidade
    Você é o redator-chefe, astrônomo e divulgador científico do projeto educacional itinerante "Viagem ao Céu Noturno". O seu tom de voz é apaixonante, poético, altamente envolvente e cientificamente rigoroso. Você escreve para despertar pura fascinação no leitor comum e nos entusiastas do cosmos.

    ### Input Estratégico
    Categoria: {topic['category']}
    Título Base: {topic['title']}
    Contexto/Resumo: {topic['summary']}
    Fonte Confiável de Referência: {topic['link']}
    Imagem Sugerida: {topic['image']}
    Texto alternativo da imagem: {topic['image_alt']}
    Origem da imagem: {topic.get('image_source', topic['link'])}

    ### Diretrizes de Escrita Rigorosas e Magnéticas
    1. **Título Magnético:** Crie um título altamente atraente e instigante baseado no tema acima.
    2. **Gancho Sensorial (Introdução):** Conecte o leitor à imensidão do cosmos logo na primeira frase, criando uma atmosfera imersiva.
    3. **Fundamentação Científica & Visual:** 
       - Desenvolva o conteúdo com rigor acadêmico, mas em linguagem acessível.
       - Se for sobre o **Sistema Solar / Conceitos / Aplicativos (como Stellarium)**, dê dicas práticas de como o leitor pode aplicar o conhecimento na prática (observação, uso de ferramentas).
       - Se for sobre **Etnoastronomia Tupi-Guarani**, valorize profundamente a herança cultural e a leitura cosmológica dos nossos povos originários.
    4. **Enriquecimento Visual:** No texto em Markdown, inclua marcadores ou sugestões de descrição visual (ex: `*[Legenda sugerida: Detalhe das crateras lunares em alta resolução]*`) para orientar o uso de imagens imersivas.
    5. **Encerramento e Referência Confiável:** Finalize com um convite acolhedor para as vivências presenciais do "Viagem ao Céu Noturno" e inclua obrigatoriamente a referência científica confiável no final: `[🔗 Saiba mais e acesse a fonte confiável]({topic['link']})`.

    ### Normalização obrigatória do Markdown
    - O campo `content` deve conter Markdown válido, com quebras de linha reais entre parágrafos e títulos `##`/`###`; não devolva os caracteres literais `\\n`.
    - Use `**texto**` para negrito e `[texto descritivo](URL)` para links. O link da fonte deve usar exatamente a URL fornecida acima, sem espaços, parênteses extras ou URL inventada.
    - Inclua a imagem fornecida no corpo usando exatamente `![{topic['image_alt']}]({topic['image']})`. Use o mesmo caminho também no campo `frontmatter.image`.
    - A imagem prioritária vem da página da fonte acima. Se ela não estiver disponível, será usada uma imagem ilustrativa alternativa; não diga que uma alternativa representa a imagem original da matéria.
    - A imagem pode ser apenas ilustrativa; não afirme que ela mostra o objeto ou evento da notícia se a fonte não confirmar isso.
    - Não escreva etiquetas como `[Legenda sugerida: ...]` no lugar de mídia e não use HTML. Não inclua cercas de código em volta do JSON.
    - Retorne `content` como uma string JSON válida: escape as quebras de linha conforme JSON exige; após o parse, elas devem ser quebras de linha reais.

    ### Formato de Saída Obrigatório
    Retorne EXPLICITAMENTE em formato JSON puro, estruturado exatamente assim (sem blocos de markdown adicionais como ```json):
    {{
      "filename": "AAAA-MM-DD-slug-do-artigo.md",
      "frontmatter": {{
        "slug": "slug-do-artigo",
        "title": "Título magnético criado por você",
        "date": "AAAA-MM-DD",
        "author": "Viagem ao Céu Noturno",
        "description": "Meta-descrição intrigante de até 160 caracteres para SEO.",
        "image": "{topic['image']}",
        "tags": ["{topic['category']}", "Astronomia", "Ciência", "Cosmos"]
      }},
      "content": "O texto completo da matéria formatado em Markdown..."
    }}
    """

    # Use current GenerateContent model IDs; Gemini 1.5 Flash is no longer available.
    models_to_try = ["gemini-3.8-flash", "gemini-3.5-flash"]
    errors = []

    for model_name in models_to_try:
        max_retries = 2
        delay = 5
        for attempt in range(max_retries):
            try:
                print(f"Tentando gerar com o modelo {model_name} (Tentativa {attempt + 1})...")
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )
                raw_text = response.text.strip()
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:]
                if raw_text.endswith("```"):
                    raw_text = raw_text[:-3]

                return json.loads(raw_text.strip())

            except ServerError:
                if attempt < max_retries - 1:
                    time.sleep(delay)
                else:
                    print(f"Modelo {model_name} indisponível. Tentando próximo modelo...")
                    errors.append(f"{model_name}: erro temporário do servidor após {max_retries} tentativas")
                    break
            except Exception as e:
                print(f"Erro com {model_name}: {e}")
                errors.append(f"{model_name}: {e}")
                break

    details = " | ".join(errors) if errors else "nenhum detalhe retornado pela API"
    raise RuntimeError(f"Não foi possível gerar o post com os modelos configurados. Erros: {details}")

def save_markdown_file(post_data):
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    filename = f"content/blog/{post_data['filename']}"
    os.makedirs("content/blog", exist_ok=True)

    fm = post_data["frontmatter"]
    markdown_content = f"""---
slug: "{fm['slug']}"
title: "{fm['title']}"
date: "{today_str}"
author: "{fm['author']}"
description: "{fm['description']}"
image: "{fm['image']}"
tags: {json.dumps(fm['tags'], ensure_ascii=False)}
---

{post_data['content']}
"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(markdown_content)
    print(f"Post gerado com sucesso: {filename}")

if __name__ == "__main__":
    topic_item = download_topic_image(select_strategic_astronomy_topic())
    post_json = generate_blog_post(topic_item)
    save_markdown_file(post_json)
