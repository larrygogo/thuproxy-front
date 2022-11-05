import {useContext} from 'react'
import {TemplateContextValue} from 'src/@core/context/types'
import {TemplateContext} from "src/@core/context/TemplateContext";

export const useTemplate = (): TemplateContextValue => useContext(TemplateContext)
