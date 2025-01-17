import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/components/card"

export default function TownHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Istorie</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Primele așezări (Preistorie – Epoca Medievală)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="mb-4">
              Originile Brașovului datează din vremuri străvechi, dovezile arheologice sugerând existența așezărilor umane încă din perioada Neolitică.</p>
              <p className="mb-2">
              •	Rădăcinile dacice: Zona a făcut parte din regatul Daciei, înfloritor înainte de cucerirea romană din anul 106 d.Hr. Fortărețele și așezările din apropiere indică importanța strategică a regiunii.</p>
              <p className="mb-2">
              •	Influența sașilor: În secolul al XII-lea, sașii germani s-au stabilit în regiune, aducând cu ei meșteșuguri avansate, expertiză în comerț și arhitectură fortificată. Ei au numit orașul “Kronstadt.”.</p>
              <p>
              •	Primele mențiuni: Orașul a fost documentat oficial pentru prima dată în 1235 sub numele de “Corona.” Primele așezări erau concentrate în jurul unei biserici de lemn pe locul unde mai târziu a fost construită Biserica Neagră.</p>
            </div>
            <div className="flex-1">
              <Image 
                src="https://www.bizbrasov.ro/wp-content/uploads/2015/02/brasovul-vechi.jpg" 
                alt="Primele așezări" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ascensiunea orașului medieval (Secolele XIV–XVI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Image 
                src="https://www.bizbrasov.ro/wp-content/uploads/2020/09/brasovul-medieval.jpg" 
                alt="Ascensiunea orașului medieval" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
            <p className="mb-4">
            Brașovul a înflorit ca un important nod comercial în Evul Mediu, datorită poziției sale strategice la intersecția dintre Europa Centrală și de Est.</p>
              <p className="mb-2">
              •	Fortificațiile: Ziduri și bastioane puternice au fost construite pentru a proteja orașul de invaziile frecvente ale mongolilor și otomanilor. Turnul Alb, Turnul Negru și porți precum Poarta Șchei sunt martorii acestor eforturi.</p>
              <p className="mb-2">
              •	Melanj cultural: Sașii, românii, maghiarii și alte grupuri etnice au coabitat, contribuind la diversitatea culturală a Brașovului. Cartierul Șchei, locuit de români, a jucat un rol esențial în păstrarea tradițiilor românești.</p>
              <p>
              •	Boom economic: Brașovul a devenit un centru comercial major, cunoscut pentru târgurile și breslele sale specializate în textile, prelucrarea metalelor și piele.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Epoca modernă (Secolele XVII–XVIII)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="mb-4">
              Orașul a trecut prin transformări semnificative în epoca modernă, marcate de schimbări politice și progrese culturale.</p>
              <p className="mb-2">
              •	Tulburări religioase: Reforma a ajuns și la Brașov, influențând profund viața religioasă a orașului. Biserica Neagră a devenit un bastion luteran, în timp ce creștinii ortodocși au continuat să se roage în cartierul Șchei.</p>
              <p className="mb-2">
              •	Dezvoltarea educației: Brașovul a devenit un centru al învățământului, cu instituții notabile, precum prima școală românească, înființată în 1495. Aceasta a fost crucială pentru păstrarea și promovarea limbii și literaturii române.</p>
              <p>
              •	Influența otomană: Deși regiunea a rămas parte a Regatului Ungariei, a fost adesea prinsă în conflictele dintre Imperiul Otoman și Monarhia Habsburgică.</p>
            </div>
            <div className="flex-1">
              <Image 
                src="https://plimbareprinbrasov.wordpress.com/wp-content/uploads/2017/04/brasov-medieval-map.jpg" 
                alt="Epoca modernă" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Creșterea industrială (Secolul al XIX-lea)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Image 
                src="https://www.monitorulexpres.ro/wp-content/uploads/2022/08/02.jpg" 
                alt="Creșterea industrială" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
            <p className="mb-4">
            Secolul al XIX-lea a marcat industrializarea rapidă a Brașovului, transformându-l într-un oraș modern.</p>
              <p className="mb-2">
              •	Dezvoltarea infrastructurii: Sosirea căii ferate în 1873 a conectat Brașovul cu marile orașe europene, stimulând creșterea economică.</p>
              <p className="mb-2">
              •	Explozia manufacturii: Fabricile de textile, utilaje și produse chimice au devenit emblematice, atrăgând muncitori din zonele rurale înconjurătoare.</p>
              <p>
              •	Renaștere culturală: Orașul a cunoscut o revigorare culturală, cu teatre, muzee și biblioteci înfloritoare. Figuri românești de seamă, precum George Barițiu, au contribuit la trezirea națională prin publicații și educație.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Războaiele Mondiale și perioada interbelică (Secolul XX)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="mb-4">
              Brașovul s-a confruntat cu provocări majore la începutul secolului XX, dar a ieșit un oraș rezilient.</p>
              <p className="mb-2">
              •	Primul Război Mondial: Prăbușirea Imperiului Austro-Ungar și unirea Transilvaniei cu România în 1918 au adus Brașovul sub administrație românească.</p>
              <p className="mb-2">
              •	Prosperitatea interbelică: Orașul și-a extins baza industrială și infrastructura urbană, devenind un important centru economic modern.</p>
              <p>
              •	Al Doilea Război Mondial: Brașovul a suferit greutăți în timpul războiului, inclusiv bombardamente și tulburări politice.</p>
            </div>
            <div className="flex-1">
              <Image 
                src="https://www.istorie-pe-scurt.ro/wp-content/uploads/2014/11/Romania-in-Primul-Razboi-Mondial.jpg" 
                alt="Războaiele Mondiale" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Epoca comunistă (1947–1989)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Image 
                src="https://cdn.adh.reperio.news/image-6/6e9c0516-543a-46ae-aabd-7841c997b466/index.jpeg?p=a%3D1%26co%3D1.05%26w%3D700%26h%3D750%26r%3Dcontain%26f%3Dwebp" 
                alt="Epoca comunistă" 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
            <p className="mb-4">
            Regimul comunist a schimbat profund peisajul social și economic al Brașovului.</p>
              <p className="mb-2">
              •	Industrializare intensă: Fabrici care produceau utilaje grele, camioane și produse chimice au dominat economia.</p>
              <p className="mb-2">
              •	Urbanizare: Blocurile de locuințe mari au fost construite pentru a acomoda forța de muncă în creștere, schimbând farmecul arhitectural tradițional al orașului.</p>
              <p>
              •	Reprimare și rezistență: Orașul a fost martor la proteste împotriva regimului, inclusiv revolta muncitorilor din Brașov din 1987, care a devenit un simbol al opoziției față de comunism în România.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brașovul de astăzi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
          După căderea comunismului, Brașovul s-a transformat într-unul dintre cele mai dinamice și atractive orașe din România.</p>
          <p className='mb-2'>
          •	Boom turistic: Farmecul medieval al orașului, proximitatea față de stațiunile de schi și reperele precum Biserica Neagră și Muntele Tâmpa l-au transformat într-o destinație turistică de top.</p>
          <p className='mb-2'>
          •	Revigorare culturală: Festivalurile, teatrele și muzeele sărbătoresc bogata moștenire a Brașovului și diversitatea tradițiilor sale.</p>
          <p>
          •	Creștere economică: Orașul a devenit un hub pentru industriile IT, auto și aerospațiale, atrăgând investiții interne și internaționale.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Image 
              src="https://media.istockphoto.com/id/1483709156/photo/brasov-romania-aerial-view.jpg?s=612x612&w=0&k=20&c=YHu6zf5QSqo8-vHtUPyCX6nG4tST0951zNoLT2Prn28=" 
              alt="Preserved historical building" 
              width={300} 
              height={200} 
              className="rounded-lg"
            />
            <Image 
              src="https://www.clubulcopiilor.ro/wp-content/uploads/2023/04/Lacul-Noua-1-jpeg.webp" 
              alt="City Lake" 
              width={300} 
              height={200} 
              className="rounded-lg"
            />
            <Image 
              src="https://bzb.ro/files/images/centru%20civic%20brasov%202023%20drona.jpg" 
              alt="Modern town center" 
              width={300} 
              height={200} 
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

