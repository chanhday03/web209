import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useProductMutation } from '@/hooks/useProductMutation'
import { IProduct } from '@/interfaces/Product'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'

type NameFormProps = {
    data: IProduct
}

const NameForm = ({ data }: NameFormProps) => {
    const [toggle, setToggle] = useState(false)
    const { toast } = useToast()
    const { form, onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                title: 'Cập nhật tên thành công',
                variant: 'success'
            })
            setToggle(false)
        }
    })
    // side effect là những hành phụ khi mà component được render
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data?.name,
                price: data?.price
            })
        }
    }, [data, form])

    const handleOnSubmit = (values: IProduct) => {
        onSubmit({ ...data, ...values })
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                <h2 className='font-bold'>Tên sản phẩm</h2>
                <Button variant='ghost' onClick={() => setToggle(!toggle)}>
                    {toggle ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!toggle && <p className='my-2'>{data?.name}</p>}
            {toggle && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleOnSubmit)} className=''>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Tên' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-2'>
                            Lưu
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default NameForm
