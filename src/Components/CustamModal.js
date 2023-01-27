import React from 'react'

function CustamModal({ title = "Hata", message = "", onCancel = () => { }, onConfirm = () => { } }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0,
      width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:1000
    }}>
      <div style={{
        width: "70%", padding: "20px",
        backgroundColor: "white",
        borderRadius: '5px',
        border:"3px solid red"
      }}>
        <h1 className='text-center'>{title}</h1>
        <p className='text-center'>{message}</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'

        }}>
          <button onClick={onCancel} className='btn btn-secondary'>Vazgeç</button>
          <button onClick={onConfirm} className='btn btn-danger'>Onayla</button>
        </div>
      </div>
    </div>
  )
}

export default CustamModal