import { CardTypes } from "@/types"

interface CardProps {
    card: CardTypes
}

const Cards:React.FC<CardProps> = ({card}) => {
  return (
    <div className="w-[300px] h-[400px] bg-pink-200">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <p>{card.stars}</p>
    </div>
  )
}

export default Cards