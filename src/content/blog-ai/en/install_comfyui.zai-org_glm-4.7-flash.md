
---
parentId: install_comfyui
written_by: zai-org/glm-4.7-flash
---
## Wstęp do ComfyUI

**ComfyUI** to aplikacja, która pozwala łączyć ze sobą różne elementy przetwarzania danych za pomocą wygodnego interfejsu graficznego. Dzięki temu możesz tworzyć złożone przepływy pracy, w których jeden węzeł może na przykład wczytać plik CSV, wyodrębnić tekst za pomocą wyrażeń regularnych, trenować model RVC lub generować tekst za pomocą HiggsTTS.

Poniżej znajdziesz instrukcje instalacji na systemie Linux (w szczególności na Fedora 44), na którym zostały one przetestowane. Kroki oparte są na oficjalnej dokumentacji [ComfyUI](https://docs.comfy.org/installation/system_requirements).

## Wymagania wstępne

Zdecydowanie zalecam użycie narzędzia [mise](https://mise.jdx.dev/) do instalacji [uv](https://docs.astral.sh/uv/getting-started/installation/) za pomocą polecenia `mise use -g uv`.

Do instalacji potrzebujesz następujących elementów:

*   Python w wersji 3.12 lub nowszej.
*   Git.
*   Narzędzie `uv`.
*   Terminal (zalecamy używanie emulatora terminala, takiego jak WezTerm).

## Instalacja

### 1. Sklonowanie repozytorium

Najpierw pobierz kod źródłowy projektu:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Instalacja zależności

Zainstaluj wymagane pakiety za pomocą `uv`:

```bash
uv pip install -r requirements.txt
```

**Ważna uwaga:** Instalacja zakłada obecność karty graficznej NVIDIA. Jeśli posiadasz kartę AMD, musisz zainstalować pakiet `torch` osobno. Testowano to na karcie Radeon RX 9070.

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Uruchomienie serwera

Po zakończeniu instalacji uruchom serwer główny:

```bash
uv run main.py
```

### 4. Otwarcie panelu w przeglądarce

Jeśli instalacja przebiegła pomyślnie, otwórz panel w przeglądarce internetowej (domyślny port to 8188):

[http://localhost:8188](http://localhost:8188)

### 5. Gotowe!

Powinieneś teraz widzieć interfejs ComfyUI.

## Wtyczki niestandardowe (Custom Nodes)

Warto wiedzieć, że ComfyUI nie jest w pełni "wygodne" w kwestii pobierania modeli lub wtyczek, ponieważ wymaga ręcznego pobierania plików i umieszczania ich w odpowiednich folderach. Na szczęście istnieją społecznościowe rozwiązania, które ułatwiają ten proces.

Aby zainstalować wtyczkę niestandardową ręcznie, musisz przejść do folderu `custom_nodes` i sklonować repozytorium wybranej wtyczki z GitHuba:

```bash
echo $(pwd) # Powinno pokazać folder główny ComfyUI
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Pamiętaj, że wtyczki mogą mieć własne zależności, które trzeba zainstalować zgodnie z instrukcją w pliku `README`, a czasami mogą występować konflikty wersji z istniejącymi pakietami.

## Polecane wtyczki niestandardowe

### ComfyUI Manager

Ten pakiet automatyzuje pobieranie modeli, dzięki czemu nie musisz robić tego ręcznie.

Link: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader

Ta wtyczka pozwala pobierać modele bezpośrednio z interfejsu użytkownika, bez konieczności odwiedzania serwisów hostujących modele, takich jak Huggingface.

Link: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  
