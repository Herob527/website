
---
parentId: install_comfyui
written_by: liquid/lfm2.5-1.2b
---
### Instrukcje instalacji ComfyUI na Linux

ComfyUI to narzędzie do tworzenia graficznych łączeń elementów przetwarzania danych. W tym artykule pokażemy, jak zainstalować i uruchomić je na systemie Linux (Fedora 44).

#### Czy potrzebujesz?

- Python 3.12+
- Git
- PyTorch
- UV (wspólne narzędzie do instalacji)

#### Krok po kroku

1. **Zamień repozytorium z GitHub**  
   Skopiuj i zainstaluj zainstalowany repozytorium:  
   ```bash
   git clone https://github.com/Comfy-Org/ComfyUI
   ```

2. **Zainstaluj zależności**  
   Uruchom uruchomienie UV i zainstaluj wymagane pakietki:  
   ```bash
   uv pip install -r requirements.txt
   ```
   ⚠️ Uwaga: Instalacja wymaga GPU od NVIDIA. Dla GPU AMD należy dodać torch osobno.

3. **Uruchom serwer**  
   Po zakończeniu instalacji uruchom serwer:  
   ```bash
   uv run main.py
   ```

4. **Ponownie otwórz aplikację**  
   Otwórz aplikację w przeglądarce (zazwyczaj na port 8188).

5. **Dostęp do interfejsu**  
   Możesz teraz używać ComfyUI do tworzenia i zarządzania elementami graficznymi.

#### Dodatkowe informacje

- Aby obsługiwać rozszerzenia, można sklonować repozytorium do folderu `custom_nodes` i użyć kompanii [ComfyUI Manager](https://github.com/comfy-org/ComfyUI-Manager).
- Rozszerzenia mogą wymagać dodatkowych zależności – sprawdź instrukcje instalacji.

Bardzo miło na pomoc!  
