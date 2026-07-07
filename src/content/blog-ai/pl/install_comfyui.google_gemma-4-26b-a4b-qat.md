
---
parentId: install_comfyui
written_by: google/gemma-4-26b-a4b-qat
---
# Instalacja ComfyUI

## Co to jest ComfyUI?

**ComfyUI** to aplikacja, która pozwala na graficzne łączenie ze sobą elementów przetwarzania danych, zwanych **węzłami (nodes)**.

Te węzły można łączyć w ramach jednego łańcucha działań. Dzięki temu można wykonywać złożone zadania, takie jak:
* ładowanie plików CSV,
* wyciąganie tekstu za pomocą wyrażeń regularnych (regex),
* uruchamianie treningu RVC,
* generowanie dźwięku za pomocą HiggsTTS.

*Poniższa instrukcja została przygotowana na podstawie testów przeprowadzonych na systemie Linux (Fedora 44).*

## Wymagania wstępne

Zaleca się użycie narzędzia [mise](https://mise.jdx.dev/) do instalacji [uv](https://docs.astral.sh/uv/getting-started/installation/) za pomocą komendy:
`mise use -g uv`

Aby poprawnie przejść przez proces instalacji, będziesz potrzebować:
* **Python 3.12+**
* **git**
* **uv** (menedżer pakietów)
* **terminal** (np. Wezterm)

## Instrukcja instalacji

### 1. Klonowanie repozytorium

Najpierw pobierz pliki projektu z GitHuba:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Instalacja zależności

Następnie zainstaluj wymagane pakiety za pomocą `uv`:

```bash
uv pip install -r requirements.txt
```

**Ważna informacja dotycząca karty graficznej (GPU):**
Powyższa komenda jest przeznaczona dla użytkowników kart **NVIDIA**. Jeśli korzystasz z karty **AMD** (testowano na modelu RX 9070), musisz zainstalować bibliotekę `torch` osobno, używając poniższej komendy:

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Uruchomienie serwera

Po zainstalowaniu wszystkich elementów możesz uruchomić serwer:

```bash
uv run main.py
```

### 4. Dostęp do panelu

Gdy serwer zostanie uruchomiony, wejdź do panelu sterowania w przeglądarce internetowej. Domyślnie aplikacja jest dostępna pod adresem:

[http://localhost:8188](http://localhost:8188)

Po wejściu na ten adres zobaczysz interfejs ComfyUI.

## Rozszerzenia

W podstawowej wersji ComfyUI modele oraz rozszerzenia należy pobierać ręcznie i samodzielnie umieszczać w odpowiednich folderach.

### Ręczna instalacja rozszerzeń

Aby ręcznie zainstalować rozszerzenie, należy pobrać repozytorium interesującego nas narzędzia bezpośrednio do folderu `custom_nodes`:

```bash
echo $(pwd) # Powinien wskazać folder ComfyUI
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Pamiętaj, że rozszerzenia mogą posiadać własne zależności, które wymagają instalacji zgodnie z ich instrukcją. Może to również prowadzić do konfliktów wersji pakietów Python.

### Polecane rozszerzenia

Aby ułatwić sobie pracę, warto skorzystać z gotowych rozwiązań stworzonych przez społeczność:

* **ComfyUI Manager** – ułatwia zarządzanie rozszerzeniami, dzięki czemu nie musisz ręcznie klonować pakietów do folderu `custom_nodes`.
  [Link do projektu](https://github.com/comfy-org/ComfyUI-Manager)

* **ComfyUI Workflow Models Downloader** – pozwala na automatyczne pobieranie brakujących modeli potrzebnych do obsługi konkretnych węzłów. Dzięki temu nie musisz ręcznie szukać plików w serwisach takich jak Huggingface.
  [Link do projektu](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  
