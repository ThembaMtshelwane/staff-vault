import { useState } from 'react'
import ContentControls from '../../../components/ContentControls'
import { CustomSpinner } from '../../../components/CustomSpinner'
import DepartmentCard from '../../../components/DepartmentCard'
import PaginationUI from '../../../components/PaginationUI'
import { useGetDepartmentsQuery } from '../../../slices/departmentApiSlice'

const Departments = () => {
  const limit = 12
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const { data: departments, isLoading } = useGetDepartmentsQuery({
    page: currentPage,
    search,
  })
  return (
    <>
      <h1>Manage Departments.</h1>
      <ContentControls
        addFunctionName={'Department'}
        addLink={'add-department'}
        setSearch={setSearch}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div>
          <div className="grid gap-4 justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative h-full">
            {departments?.data.map((department) => (
              <DepartmentCard
                key={department._id}
                name={department.name}
                id={department._id}
                email={department.email}
                superviour={department.supervisor || ''}
                staff={department.staff.length}
              />
            ))}
          </div>
          {departments?.data.length && (
            <PaginationUI
              limit={limit}
              currentPage={currentPage}
              totalElements={departments.pagination.totalDepartments}
              totalPages={departments.pagination.totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Departments
