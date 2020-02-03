import React, { useRef, useState, useLayoutEffect } from 'react'
import Quagga from 'quagga'
import styled from "styled-components/macro"
import 'components/BarcodeScanner.css'

const CameraDiv = styled.div`
  // backgrund-color: #e5faf5; 
  margin-top: 60px;
  text-align: center;
`
export const BarcodeScanner = ({ className, onDetected }) => {
  const [initializing, setInitializing] = useState(true)
  const cameraDivRef = useRef()
  const hasResult = useRef(false)
  Quagga.onDetected((data) => {
    if (!hasResult.current) {
      onDetected(data.codeResult.code)
    }
    hasResult.current = true
    setTimeout(() => {
      hasResult.current = false
    }, 500)
  })
  useLayoutEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: cameraDivRef.current
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, (err) => {
      if (err) {
        console.error('Failed to initialize reader', err)
        return
      }
      Quagga.start()
      setInitializing(false)
    })
    return () => {
      Quagga.stop()
    }
  }, [])
  return (
    <CameraDiv>
      {initializing && <div>Starting camera...</div>}
      <div ref={cameraDivRef} className={className} />
    </CameraDiv>
  )
}
