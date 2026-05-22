import requests
import sys
base_url = "https://pokeapi.co/api/v2/"

def get_pokemon(name):
    url= f"{base_url}/pokemon/{name}"
    response= requests.get(url)
    pokemon_data = response.json()
    return pokemon_data

if len(sys.argv)== 2:
    pekemon_name= sys.argv[1]
pokemon_info= get_pokemon(pekemon_name)

if pokemon_info:
    print(f"Name: {pokemon_info["name"]}")
    print(f"Weight: {pokemon_info["weight"]}")
    print(f"Id: {pokemon_info["id"]}")
    print(f"Height: {pokemon_info["height"]}")
