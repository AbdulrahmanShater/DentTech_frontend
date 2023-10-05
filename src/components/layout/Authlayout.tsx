"use client";

export default function Authlayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen overflow-hidden w-full">

      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Main Content Start ===== --> */}
        {/* md:p-6 2xl:p-10 h-full */}
        <main className=''>
          {/* <div className="mx-auto max-w-screen-2xl p-3 md:p-6 2xl:p-10 bg-meta-7"> */}
          {children}
          {/* </div> */}
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}
    </div>
  )
}
