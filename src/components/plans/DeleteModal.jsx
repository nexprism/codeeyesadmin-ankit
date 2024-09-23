import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/allModalSlice'
import { useDeletPlanMutation, useGetAllPlansQuery } from '../../redux/features/companyEndPoint'
import toast from 'react-hot-toast'

export default function DeleteModal() {
    const dispatch = useDispatch()
    const { isOpen, data } = useSelector((state) => state.allCommonModal)

    const [deletePlan, { isLoading }] = useDeletPlanMutation()
    const { refetch } = useGetAllPlansQuery();


    const handleDelte = async () => {
        try {
            const res = await deletePlan(data)
            if (res?.data?.http_status_code === 200) {
                refetch()
                dispatch(closeModal());
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <>
            <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
                <Modal.Header className='bg-danger'>
                    <Modal.Title className='text-white mb-0'>Delete Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this plan?</p>
                </Modal.Body>
                <Modal.Footer className='justify-content-end'>
                    <Button
                        variant='danger'
                        onClick={handleDelte}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button variant='primary' onClick={() => dispatch(closeModal())}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
