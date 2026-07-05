---
startDate: '2022-11-01'
endDate: '2025-04-01'
label: 'Praca w BitApps sp. z o.o.'
color: '#10b981'
order: 5
---

**Stanowisko:** Programista

Firma rozwijała platformę **WoodsApp** dla właścicieli lasów w Niemczech i Austrii.

Udostępniała ona interfejs przeglądarkowy oraz mobilny (Android / iOS).

Sam odpowiadałem za interfejs przeglądarki w React, Androida w Kotlinie, stronami firmy oraz w pewnym stopniu zagadnienia infrastrukturalne.

<br />

Na wstępie miałem zajmować się frontendem, ale też było jasne, że będę zajmować się infrastrukturą w jakimś stopniu (AWS, Gitlab CI/CD).

Pierwsze tygodnie to była nauka o AWS, by mniej więcej skojarzyć jak to działa i na czym firma stoi w kontekście infrastruktury.

Dopiero jak zobaczyłem buga (input miał spore opóźnienie w formularzu) i go naprawiłem to zaczęto mi przydzielać zadania ze sprintów.

<br />

Przydzielono mi zajmowanie się stroną firmy, [bitapps.fi](https://bitapps.fi/), i pierwszym zadaniem było dostosowanie witryny, by dało się przeglądać na mobilce oraz pasował do designu.

Potem wszedł temat interaktywnych map ([rezultat](https://bitapps.fi/solutions.html)) i przez fakt, że strona opierała się na Jekyllu (to silnik prostych stron), było trzeba wykombinować sposób, by budować JS i je władować do strony.

Najpierw wszedł webpack a potem esbuild, gdyż to nie były skomplikowane projekty a esbuild był szybki, więc na to padł wybór.

<br />

Z czasem przyszła kolejna strona, neituri.fi i tu wybrałem Astro, które wspiera JS natywnie oraz ma wbudowanie kompresowanie obrazów.

Obecnie to jest neituri.com z innym designem i wykonawcą.

<br />

Jednym z konkretnych osiągnięć była migracja z Create-React-App na Vite, co znacząco przyspieszyło pipeline instalacji czy budowania.

Innym to naprawa zawieszania się procesu CRA w trakcie budowania w pipeline, który udało się rozwiązać metodą prób i błędów właściwie

<br />

Z czasem zaczęło brakować zadań na froncie to zaoferowano mi czas na naukę Kotlina, by wesprzeć zespół mobilny.

Dzięki wsparciu zespołu, po dwóch miesiącach, zacząłem podejmować zadania też z Androida, nie tylko frontendu (miałem przydzielane, gdzie powinienem brać najpierw zadania)

<br />

Na skutek restrukturyzacji firma rozpoczęła likwidację działności, zatem po 2.5 roku musieliśmy się rozstać.
