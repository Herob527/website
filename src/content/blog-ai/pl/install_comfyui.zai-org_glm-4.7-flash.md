
---
parentId: install_comfyui
written_by: zai-org/glm-4.7-flash
---
## Wstęp

**ComfyUI** to aplikacja, która pozwala na graficzne łączenie ze sobą różnych elementów przetwarzania danych. Wyobraź sobie to jak układanie klocków – każdy klock (tzw. node) ma swoją funkcję, a Ty łączysz je w łańcuch, aby uzyskać konkretny wynik.

Możesz na przykład użyć elementów do ładowania plików CSV, wyciągania tekstu za pomocą wzorców (regex), trenowania modeli głosowych (RVC) czy generowania tekstu za pomocą HiggsTTS. Wszystko to może działać w ramach jednego spójnego procesu.

Poniżej znajdziesz instrukcję instalacji na systemie Linux (testowane na Fedora 44). Więcej szczegółów technicznych można znaleźć w oficjalnej dokumentacji ComfyUI.

## Wstępne wymagania

Zanim zaczniesz instalację, upewnij się, że masz zainstalowane odpowiednie narzędzia. Zalecam użycie menedżera `mise` do zarządzania pakietem `uv`.

Wymagane elementy to:
*   Python w wersji 3.12 lub nowszej.
*   Git.
*   Program `uv`.
*   Terminal (możesz użyć dowolnego emulatora terminala, np. WezTerm).

## Instalacja

### 1. Sklonuj repozytorium z GitHuba

Najpierw pobierz kod źródłowy aplikacji do swojego komputera:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Zainstaluj wymagane zależności

W folderze, w którym skopiowałeś repozytorium, zainstaluj wszystkie potrzebne biblioteki:

```bash
uv pip install -r requirements.txt
```

**Ważna uwaga:** Domyślna instalacja zakłada użycie karty graficznej NVIDIA. Jeśli posiadasz kartę AMD (np. RX 9070), musisz zainstalować bibliotekę PyTorch osobno, zgodnie z poniższą komendą:

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Uruchom serwer

Po zakończeniu instalacji zależności, uruchom serwer aplikacji:

```bash
uv run main.py
```

### 4. Otwórz panel w przeglądarce

Gdy serwer się uruchomi, otwórz przeglądarkę internetową i wejdź na adres domyślnego portu:

[http://localhost:8188](http://localhost:8188)

### 5. Gotowe!

Po wejściu na stronę powinieneś zobaczyć panel główny aplikacji.

## Rozszerzenia

Sam program ComfyUI nie jest w pełni "gotowy" od razu. Choć jest potężny, sam w sobie nie pobiera modeli ani rozszerzeń – trzeba to zrobić ręcznie, wrzucając pliki do odpowiednich folderów.

Na szczęście społeczność stworzyła narzędzia, które to ułatwiają. Jeśli chcesz zainstalować rozszerzenie ręcznie, musisz:
1. Wejść do folderu `custom_nodes`.
2. Sklonować repozytorium interesującego Cię rozszerzenia z GitHuba.

```bash
echo $(pwd) # Powinien wskazać folder ComfyUI
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Pamiętaj, że rozszerzenia mogą mieć swoje własne wymagania (zależności), które trzeba zainstalować zgodnie z instrukcją, a także mogą powodować konflikty wersji pakietów Pythona.

## Polecane rozszerzenia

### ComfyUI Manager

To narzędzie ułatwia zarządzanie elementami stworzonymi przez społeczność. Dzięki niemu nie musisz już ręcznie klonować pakietów do folderu `custom_nodes`.

Link: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader

Rozszerzenie to automatycznie pobiera brakujące modele potrzebne do działania konkretnych elementów (node'ów). Dzięki temu oszczędzasz czas, który zazwyczaj musiałbyś poświęcić na ręczne wyszukiwanie i pobieranie plików z serwisów takich jak Huggingface.

Link: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  
