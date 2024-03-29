import { Skeleton } from '@/components/ui/skeleton'
import { useProductQuery } from '@/hooks/useProductQuery'
import { DataTable } from './DataTable'
import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../ui/use-toast'
import { IProduct } from '@/interfaces/Product'
import { getColumns } from './Column'
const ProductList = () => {
    const { toast } = useToast()
    const { data, isLoading, isError } = useProductQuery()
    const { onRemove } = useProductMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                description: 'Xóa thành công',
                variant: 'success'
            })
        }
    })
    if (isLoading)
        return (
            <>
                <Skeleton className='w-[200px] h-[20px] rounded-full' />
                <Skeleton className='w-[100px] h-[20px] rounded-full' />
            </>
        )
    if (isError) return <div>Error.</div>
    const columns = getColumns(onRemove)

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>
            <DataTable columns={columns} data={data as IProduct[]} />
        </div>
    )
}
export default ProductList
