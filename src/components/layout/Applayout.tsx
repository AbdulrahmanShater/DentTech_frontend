"use client"
import { useState } from 'react'
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import RequireAuthLayout from './RequireAuthLayout';


export default function Applayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <RequireAuthLayout>
      <div className="flex h-screen overflow-hidden w-full">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className='md:p-6 2xl:p-10'>
            {/* <div className="mx-auto max-w-screen-2xl p-3 md:p-6 2xl:p-10 bg-meta-7"> */}
            {children}
            {/* </div> */}
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </RequireAuthLayout>
  )
}
