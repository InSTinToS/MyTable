/* eslint-disable camelcase */
import React, { ChangeEvent, PropsWithChildren, useState } from 'react'
import Style from './styles'

import useSortableData, { ConfigType } from './useSortableData'

import ArrowIcon from 'assets/ArrowIcon'

interface TableProps<TD> {
  startConfig: ConfigType<TD>
  headerData: HeaderData<TD>[]
  data: TD[]
}

export interface HeaderData<TD> {
  name: keyof TD & string
  label: string
}

const filter = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.toLowerCase()
  const regexp = new RegExp(`^${value}`)

  const table = document.getElementById('table')
  const tr = table?.getElementsByTagName('tr')
  const td = table?.getElementsByTagName('td')

  const removeDisplay = (array: any[], regexP: RegExp): boolean => {
    for (let k = 0; k < array.length; k += 1)
      if (array[k].toLowerCase().search(regexP) > -1) return true

    return false
  }

  if (tr !== undefined && td !== undefined)
    for (let i = 0; i < tr.length; i += 1) {
      const tdsOfRow = []
      const numberOfColumns = td.length / tr.length

      for (let k = 0; k < numberOfColumns; k += 1) {
        const tdOfColumn = tr[i].getElementsByTagName('td')[k]
        tdsOfRow.push(tdOfColumn.innerHTML)
      }

      if (removeDisplay(tdsOfRow, regexp)) tr[i].style.display = ''
      else tr[i].style.display = 'none'
    }
}

function Table<TD extends { id: number }>({
  headerData,
  startConfig,
  data,
}: PropsWithChildren<TableProps<TD>>): JSX.Element {
  const [tablePage, setTablePage] = useState(2)
  const { items, sort, sortConfig } = useSortableData<TD>({
    items: data,
    config: startConfig,
  })

  const arrowAnimation = (thToAnimate: string) => {
    if (sortConfig === null) return { rotate: 0 }

    const direction = sortConfig?.indexer === thToAnimate ? sortConfig.direction : undefined

    if (direction === 'ascending') return { rotate: -180 }
    if (direction === 'descending') return { rotate: 0 }
    return { rotate: -90 }
  }

  const onTableScroll = () => {
    const table = document.getElementById('tableWrapper')

    if (table !== null) {
      const condition = table.scrollHeight - table.scrollTop

      if (condition === table.clientHeight && !isClear) {
        makeRequest(tablePage)
        setTablePage(tablePage + 1)
      }
    }
  }

  return (
    <Style className='Table'>
      <input type='text' placeholder='Pesquisar' autoComplete='off' onChange={filter} />

      <table>
        <thead>
          <tr>
            {headerData.map(({ label, name }) => (
              <th key={name}>
                <button type='button' onClick={() => sort && sort(name)}>
                  <ArrowIcon initial={{ rotate: -90 }} animate={arrowAnimation(name)} />
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div id='tableWrapper' onScroll={onTableScroll}>
        <table id='table'>
          <tbody>
            {items?.map(item => (
              <tr key={item.id}>
                {headerData.map(({ label, name }) => {
                  return <td key={label}>{item[name as keyof TD]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Style>
  )
}

export default Table
