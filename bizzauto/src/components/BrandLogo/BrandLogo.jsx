import BrandIcon from './BrandIcon'


export function BrandLogo(props) {
  return (
    <div className='flex-between' style={{ color: 'inherit' }} {...props}>
      <BrandIcon width={43} height={43} />
      <span className={'text-3xl font-bold ml-2'}>MiaJupiter</span>
    </div>
  )
}

export default BrandLogo
