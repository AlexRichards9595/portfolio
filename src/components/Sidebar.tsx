const Sidebar = () => {
  return <div className={'flex flex-col items-center h-full min-h-screen w-96 bg-secondary pt-24'}>
    <div className={'flex flex-col'}>
    <p className={'text-3xl text-center'}>Alex Richards</p>
    <p className={'text-xl text-center text-lightest'}>Web Builder | Happy Camper</p>
    </div>
    <div className={'flex flex-col grow justify-center items-center gap-8'}>
      <p className={'text-xl'}>Home</p>
      <p className={'text-xl'}>Work</p>
      <p className={'text-xl'}>Reviews</p>
      <p className={'text-xl'}>Projects</p>
    </div>
  </div>
}

export default Sidebar