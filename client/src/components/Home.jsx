import React from 'react'
import { Navbar } from './shared/Navbar'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel'
import { LatestJobs } from './LatestJobs'
import { Footer } from './Footer'
import { useGetAllJobs } from '@/hooks/useGetAllJobs'

export const Home = () => {
  useGetAllJobs();
  return (
    <div>
        <Navbar />
        <div className=''>
          <HeroSection  />
        </div>
        <CategoryCarousel />
        <LatestJobs />
        <Footer />  
    </div>
  )
}
