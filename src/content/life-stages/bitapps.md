---
startDate: '2022-11-01'
endDate: '2025-04-01'
label: 'Praca w BitApps sp. z o.o.'
color: '#10b981'
order: 5
---

Stanowisko: Programista

<br />
Krótko o firmie:

BitApps to była firma, która wydawała produkt dla właścicieli lasów w Niemczech czy w Austrii (w Polsce jest ich dosyć mało).

Ten produkt, platforma WoodsApp, miał wersję na przeglądarkę oraz na Androida i iOS.

Sam zajmowałem się pracami nad wersją na przeglądarkę i Androida.
<br/>

Tutaj wstępnie przybyłem jako junior frontend developer, ale na wstępie było jasne, że też będę szedł w infrastrukturę.

Wstępnie miałem wdrożenie i zapodany link do kursu AWS na kanale freecodecamp do częściowego obejrzenia, by wiedzieć co i jak działa w infrze.

Do zadań sprintowych dopuszczono mnie, gdy naprawiłem spostrzeżonego buga w formularzu polegającym na sporym opóźnieniu przy wpisaniu wartości (useMemo rozwiązał sprawę).

<br />

Po jakimś czasie, jak okazało się, że nie ma zadań na froncie, ale są na Androidzie, to zaoferowano mi naukę Androidowego Kotlina.
Byli tam wyjadacze na których mogłem liczyć, więc po 2 miesiącach mogłem brać zadania zwłaszcza, że Kotlin jest właściwie łatwy do nauki i przyjemny w pisaniu.

<br />

Po drodze apoznałem się z Gitlab CI, zoptymalizowałem pipeline dla frontu poprzez cache oraz konsolidację niektórych etapów.

Tak samo z mobilką, tylko tutaj wystarczyło dać cache.

<br />

Przydzielono mi też zajmowanie się stroną firmy, czyli [bitapps.fi](https://bitapps.fi/).

Strona była już oparata na Jekyllu co dawało możliwości blogowe, ale jednak nie jest najlepiej dopasowany pod bardziej złożone interakcje co później wyszło.

Na wstępie poprawiłem responsywność, posty bloga i z czasem wielojęzyczność.

Doszły też rozwiązania mapowe i ostateczny kształ jest widoczny [tutaj](https://bitapps.fi/solutions.html)

Przy mapie trzeba było kombinować, ale ostatecznie udało się postawić webpacka (potem zastąpiłem esbuildem), by kompilował JSa, by potem strona podchwyciła skrypty i mapa się wyświetlała.

Sama mapa była oparta na OpenLayers i Preact, więc łatwiej było wdrożyć reszte zespołu, bo preact i react nie różniły się tu znacząco

<br />

Potem doszło neituri.fi, które obecnie funkcjonuje pod nazwą [neituri.com](https://www.neituri.com/), jednak to już zupełnie inny design i kod, którego nie pisałem

Tutaj miałem większą decyzyjność, bo to projekt od zera robiony, więc zdecydowałem się na Astro dzięki łatwiejszej integracji preacta i ogólnie JSa czy przetwarzaniu obrazów, by były lepiej dopasowane to realnych potrzeb.

Też pomagał fakt, że Astro nie wymagało długiego wdrażania dla kogoś, kto znał Reacta zwłaszcza jak widział kod.

<br />

Ostatecznie wbiła restrukturyzacja, więc trzeba było szukać dalej pracy
