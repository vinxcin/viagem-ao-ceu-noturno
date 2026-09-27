import datetime
import json
import os
import random
import time
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
    - Inclua a imagem fornecida no corpo usando `![descrição acessível]({topic['image']})`. Use a mesma imagem também no campo `frontmatter.image`.
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

    models_to_try = ["gemini-3.5-flash", "gemini-1.5-flash"]

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
                    break
            except Exception as e:
                print(f"Erro com {model_name}: {e}")
                break

    raise Exception("Todos os modelos do Gemini falharam após múltiplas tentativas devido a instabilidade nos servidores.")

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
    topic_item = select_strategic_astronomy_topic()
    post_json = generate_blog_post(topic_item)
    save_markdown_file(post_json)
