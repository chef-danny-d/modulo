import React, { Suspense } from 'react'
import Layout from '../../core/layouts/Layout'
import { useCourses } from '../../courses/hooks/useCourses'

const CoursesPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Courses</h1>
      <p className="text-lg opacity-75">Here are some courses</p>
      <Suspense>
        <ListOfCourses />
      </Suspense>
    </Layout>
  )
}

const ListOfCourses = () => {
  const { courses } = useCourses({
    include: {
      reviews: true,
      chapters: true,
    }
  })
  return (
    <ul className="flex gap-2">
      {courses.map((course) => (
        <li
          key={course.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="pb-8 rounded-t-lg" src={course.image} alt="product image" />

          <div className="px-5 pb-5">
            <a href={`/courses/${course.id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
            </a>
            <p className="text-gray-600 dark:text-gray-400">{course.summary}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{course.duration}</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">4.8</span>
              </div>
            </div>
            <div className="flex items-center mt-2.5 mb-5">
              {/*  review stars*/}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${course.price}</span>
              <a href="#"
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                to cart</a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}


export default CoursesPage
