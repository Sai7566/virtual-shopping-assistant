import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url, currency } from '../App'
import { toast } from 'react-toastify'
import { TbTrash } from "react-icons/tb"
import { useTranslation } from 'react-i18next'

const List = ({ token }) => {
  const { t } = useTranslation()  // Initialize the translation hook
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='px-2 sm:px-8 sm:mt-14'>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center py-1 px-2 bg-white bold-14 sm:bold-15 mb-1 rounded'>
          <h5>{t('Image')}</h5>
          <h5>{t('Name')}</h5>
          <h5>{t('Category')}</h5>
          <h5>{t('Price')}</h5>
          <h5>{t('Remove')}</h5>
        </div>
        {/* product List */}
        {list.map((item) => {
          return (
            <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl'>
              <img src={item.image[0]} alt="proImg" className='w-12 rounded-lg' />
              <h5 className='text-sm font-semibold'>{t(item.name)}</h5> {/* No translation needed if it's a product name */}
              <p className='text-sm font-semibold'>{t(item.category)}</p> {/* Translate the category if it's a key */}
              <div className='text-sm font-semibold'>
                {currency}{item.price}
              </div>
              <div onClick={() => removeProduct(item._id)}>
                <TbTrash className='text-right md:text-center cursor-pointer text-lg' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default List

