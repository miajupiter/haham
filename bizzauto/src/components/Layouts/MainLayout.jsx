import {BrandLogo}  from '@/components/BrandLogo/BrandLogo'


export const MainLayout =(props)=>{
  return (
    <div>
      <h2>main layout</h2>
      {props.children}
    </div>
  )
}