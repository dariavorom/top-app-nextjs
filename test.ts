const a: number = 4

//union тип для функции
function test(a: string): number | string {
    return ''
}

const test2 = (a: number): number => {
    return a * 2
}

//safe типизация, type guard
function printId(id: number | string) {
    if(typeof id === 'number') {
        console.log(id.toString())
    } else if (typeof id === 'string') {
        id.toUpperCase()
    }
}

function getSum(a: number | number[]) {
    if(Array.isArray(a)) {
        a.map((el) => el*2)
    }
}


//---------//

type Point = {
    x: number;
    y: number;
}
interface IPoint {
    x: number;
    y: number;
}
interface I3DPoint extends IPoint {
    z: number;
}

const c = (point: IPoint) => {
    const d: I3DPoint = point as I3DPoint
}

//----Enum----//
//числовой enum
enum Direction {
    Up, //это будет 0
    Down, //это будет 1 и так далее
    Left,
    Right
}

//enum как константы (лучше всего использовать, если enum используется как константа)
const enum ConstEnum {
    A,
    B
}
const d = ConstEnum.A // 0

enum Dice {
    One = 1,
    Two
}

function ruDice(dice: Dice) {
    switch(dice) {
        case Dice.One:
            return 'один'
        case Dice.Two:
            return 'два'
        default:
            const a: never = dice
    }
}

//----Tuple(кортеж)----//
const cortezh: [number, string, number] = [0, 'afg', 1]

//Generics

function logTime<T>(num: T): T {
    console.log(new Date())
    return num
}

logTime<string>('dw')
logTime<number>(1)

interface MYInterface {
    transform: <T, F>(a: T) => F
}