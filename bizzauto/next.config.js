/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  basePath:'',
  // distDir:'./dist',
  generateEtags:false,
  images:{
    //qwerty we will look back here again.
  },
  crossOrigin:'anonymous',
  httpAgentOptions:{
    keepAlive:false,
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  trailingSlash:false,
  poweredByHeader:false,
  cleanDistDir:true,
  compress:false,
  swcMinify:false,
  // output:'standalone',
}

module.exports = nextConfig
