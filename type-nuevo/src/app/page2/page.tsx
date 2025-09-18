import Cards from "@/components/Cards"
import { CardTypes } from "@/types"
const Trabajo = () => {
    const typeCard: CardTypes[] = [
        {
            title: "titulo 1",
            description: "descripcion 1",
            stars: 3
        },
        {
            title: "titulo 2",
            description: "descripcion 2",
            stars: 2
        },
        {
            title: "titulo 3",
            description: "descripcion 3",
            stars: 5
        }
    ]


    return (
        <div className="w-full h-screen bg-orange-300">
            {typeCard.map((typeCar, index) => (
                <Cards
                    key={index}
                    card={typeCar}
                />
            ))}
        </div>
    )
}

export default Trabajo;