import Image from '../Image'

const Showcase = ({ imageSrc }) => {
  return (
    <div>
      <Image src={imageSrc} className="w-136" alt="Showcase item" />
    </div>
  )
}

export default Showcase