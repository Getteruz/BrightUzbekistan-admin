import React from 'react'
import DateGroup from '../DateGroup'
import Datapicker from '../Form/Datapicker'
import cls from './filter.module.scss'

export default function Filter() {
    return (
        <div className={cls.filter} >
            <DateGroup >
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
        </div>
    )
}
