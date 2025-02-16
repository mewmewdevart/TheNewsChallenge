import requests
from config import REGISTERED_EMAIL

def register_webhook():
    payload = {"email": REGISTERED_EMAIL}
    
    register_url = "https://backend.testeswaffle.org/webhooks/case/subscribe"
    
    response = requests.post(register_url, json=payload)
    
    if response.status_code == 200:
        print("Webhook registrado com sucesso!")
    else:
        print(f"Erro ao registrar o webhook: {response.text}")
