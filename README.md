EventBroker es la solución orientada a objetos del EventEmitter de NodeJS.<br>
Está en desarrollo, pero se puede usar.

Instalala usando <br>
`npm i @enzodiazdev/eventbroker`

### Tutorial a toda velocidad:
* Importá el Broker
* Importá el EventChannel
* Importá el Suscriptor
* Crea una interfaz, donde cada clave es el nombre de un evento y el valor es un arreglo de tipos (ahora te digo como)
* Crea tres clases, una por clase importada, y exendelas.
* Implementa los miembros abstractos, claro. 
* Las clases importadas demandan parametros de tipo, ahí le pasás la interface.
* Crea las instancias de las clases concretas que creaste.
* Al broker le pasas en el constructor un EventEmitter "o cualquier cosa que se le parezca".
* Usa el método `on` del broker y pasale la instancia de un canal.
* Usa el método `add_suscriptor` del canal y pasale la instancia del suscriptor.

#### Ejemplo en código
```ts
interface TelephoneEvents {
    call: [string]
    //...
}
```
```ts
class Telephone extends Broker<TelephoneEvents> {
}
```
```ts
class Line extends EventChannel<TelephoneEvents, "call"> {
    public event_type:"call" = "call"
}
```
```ts
class Person extends Suscriptor<TelephoneEvents, "call"> {
    public event_type:"call" = "call"

    notified(message:string){
        console.log(message);
    }
}
```
```ts
const telephone_ev = new EventEmitter();
```
```ts
const telephone = new Telephone(telephone_ev);
const line = new Line(telephone);
const person = new Person();

line.add_suscriptor(person);
telephone.on("call", line);

telephone.emit("call", "Hola personas!");
```
`> Hola personas!`


