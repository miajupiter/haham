import React, { useEffect, useState } from 'react'
import { HahamLayout } from '@/components/Layouts/HahamLayout'
import { useRouter } from 'next/router'
import CodeMirror from '@uiw/react-codemirror'
import { color, oneDark, oneDarkTheme } from '@codemirror/theme-one-dark'
import {javascript} from '@codemirror/lang-javascript'
import { useTheme,ThemeProvider } from 'next-themes'

const allowedPageSizes = [8, 12, 20]

export const FormBuilderPage = () => {
  // const query = useRouter().query
  const onChange = React.useCallback((value, viewUpdate) => {
    // console.log('viewUpdate:', viewUpdate)
    console.log('value:', value)
  }, [])

  // const tema=useTheme().theme || 'dark'

  // useEffect(() => {
    
  // }, [tema])

  return (
    <React.Fragment>
      <HahamLayout>
        <h1>Form Builder</h1>
        <CodeMirror
          value="console.log('hello world!');"
          height='400px'
          extensions={[javascript({ jsx: true, typescript: true })]}
          onChange={onChange}
          theme={useTheme().theme || 'dark'}
          title='Baslik bolumu'
          contextMenu='sddfs|d4sdf|sf'
        />
      </HahamLayout>
    </React.Fragment>
  )
}

export default FormBuilderPage
