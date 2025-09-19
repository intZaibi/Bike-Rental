import BikeDetailPage from '@/components/bikeDetailPage/BikeDetailSection'
import SimilarBikesSection from '@/components/bikeDetailPage/SimilarBikeSection'
import CustomerReviewSection from '@/components/customerreviesSection/CustomerReviewSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <BikeDetailPage/>
      <CustomerReviewSection/>
      <SimilarBikesSection/>
    </div>
  )
}

export default page

