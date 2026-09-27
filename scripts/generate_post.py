import datetime
import json
import os
import time

import feedparser
from google import genai
from google.genai.errors import ServerError


client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))


def fetch_latest_astronomy_news():
    """Busca notícias priorizando EHT, ESA, NASA e temas de astrofotografia/etnoastronomia/exploração espacial/sistema solar/conceitos astronomicos/curiosidades astronomicas."""
    rss_urls = [
        "https://eventhorizontelescope.org/blog",
        "https://www.esa.int",
        "https://www.nasa.gov",
    ]

    for url in rss_urls:
        try:
            feed = feedparser.parse(url)
            if feed.entries:
                latest = feed.entries[0]
                return {
                    "title": latest.title,
                    "summary": getattr(latest, "summary", latest.title),
                    "link": latest.link,
                }
        except Exception:
            continue

    raise Exception("Nenhuma notícia encontrada em nenhum dos feeds RSS disponíveis.")


def generate_blog_post(news_item):
    prompt = f"""
    ### Papel e Identidade
    Você é o redator-chefe, astrônomo e divulgador científico do projeto educacional itinerante "Viagem ao Céu Noturno". O seu tom de voz é apaixonante, poético, altamente envolvente e cientificamente rigoroso. Você escreve para despertar pura fascinação no leitor comum e nos entusiastas do cosmos.

    ### Input (Notícia Bruta ou Tema de Referência)
    Título Original: {news_item['title']}
    Resumo/Detalhes: {news_item['summary']}
    Link de Referência: {news_item['link']}

    ### Diretrizes de Escrita para Prender a Atenção (Engagement Extremo)
    1. **Título Irresistível:** Crie um título magnético (ex: focado em revelações sobre o cosmos, mistérios de buracos negros, detalhes ocultos de planetas ou sabedoria ancestral). Nada de títulos frios de agência de notícias.
    2. **Gancho Sensorial (Introdução):** Comece transportando o leitor para baixo de um céu estrelado, descrevendo a imensidão do universo, o brilho da Lua ou o silêncio da noite antes de entrar na ciência.
    3. **Conteúdo Enriquecido (Escolha uma ou misture de forma fluida):**
       - **Astrofotografia & Telescópios:** Explique o que a descoberta revela visualmente e como astrofotógrafos ou observadores amadores podem contemplar ou registrar esse fenômeno (detalhes da Lua, planetas, anéis, nebulosas).
       - **Etnoastronomia Tupi-Guarani (Fundamental quando houver conexão):** Conecte a temática com a cosmovisão indígena brasileira — como a Via Láctea sendo a *Tapir Itapé* (Caminho da Anta), a constelação da Ema, ou a relação dos antigos povos com os ciclos celestes.
       - **Astrofísica de Vanguarda:** Se for sobre o EHT (Buracos Negros), Relatividade ou Missões Espaciais (NASA/ESA), explique de forma descomplicada, poética e eletrizante.
    4. **Estrutura Visual:** Use subtítulos atraentes (##) em Markdown, parágrafos curtos e dinâmicos.
    5. **Encerramento e Fonte:** Finalize com um convite acolhedor para as vivências presenciais do "Viagem ao Céu Noturno" e, obrigatoriamente, insira o link original: `[🔗 Leia o artigo científico completo na fonte original]({news_item['link']})`.

    ### Formato de Saída Obrigatório
    Retorne EXPLICITAMENTE em formato JSON puro, estruturado exatamente assim (sem blocos de markdown adicionais como ```json):
    {{
      "filename": "AAAA-MM-DD-slug-do-artigo.md",
      "frontmatter": {{
        "slug": "slug-do-artigo",
        "title": "Título magnético criado por você",
        "date": "AAAA-MM-DD",
        "author": "Viagem ao Céu Noturno",
        "description": "Meta-descrição intrigante de até 160 caracteres para capturar cliques.",
        "image": "/images/blog/default-cosmos.jpg",
        "tags": ["Astrofotografia", "Etnoastronomia", "Tupi-Guarani", "Cosmos"]
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
    news = fetch_latest_astronomy_news()
    post_json = generate_blog_post(news)
    save_markdown_file(post_json)
