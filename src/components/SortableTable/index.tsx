/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react'

import Table, { HeaderData } from './Table'

import DotsLoader from 'components/DotsLoader'

type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

interface SortableTableProps {
  dotsColor: string
  route: string
}

interface TableData {
  status: string
  role: string
  statusCircle: StatusTypes
  name: string
  date: string
  id: number
}

interface RequestData {
  status: StatusTypes
  full_name: string
  role: string
  created_at: string
  request_id: string
}

const makeStatusLabel = (status: StatusTypes): string => {
  switch (status) {
    case 'accepted':
      return 'Aceito'
    case 'rejected':
      return 'Recusado'
    default:
      return 'Aguardando'
  }
}

const makeDateLabel = (uglyDate: string): string => {
  const date = uglyDate.replaceAll('-', '/').split('')

  const month = {
    '01': 'jan',
    '02': 'fev',
    '03': 'mar',
    '04': 'mai',
    '05': 'abr',
    '06': 'jun',
    '07': 'jul',
    '08': 'ago',
    '09': 'set',
    '10': 'out',
    '11': 'nov',
    '12': 'dez',
  }

  const keyOfMonth = date[5] + date[6]

  return `${date[8] + date[9]} ${month[keyOfMonth as keyof typeof month]}`
}

const headerData: HeaderData<TableData>[] = [
  { name: 'name', label: 'Name' },
  { name: 'role', label: 'Role' },
  { name: 'status', label: 'Status' },
  { name: 'date', label: 'Date' },
]

const SortableTable: React.FC<SortableTableProps> = ({ dotsColor, route }) => {
  const [data, setData] = useState<TableData[] | null>(null)
  const [isClear, setIsClear] = useState(false)

  const makeRequest = useCallback(
    async (page: number) => {
      if (!isClear) {
        const element = document.getElementById('tableWrapper')

        if (element) {
          const limits = Math.max((element?.clientHeight / 32) * 2, 50)

          const { requests } = await api.get(`${route}/${page}/${limits}`)

          const tableData: TableData[] = requests.map(
            ({ status, full_name, role, created_at, request_id }: RequestData) => {
              return {
                status: makeStatusLabel(status),
                role,
                statusCircle: status,
                name: full_name,
                date: makeDateLabel(created_at),
                id: request_id,
              }
            }
          )

          if (requests.length === 0) setIsClear(true)
          else setData(before => (before === null ? tableData : [...before, ...tableData]))
        }
      }
    },
    [isClear, route]
  )

  useEffect(() => {
    makeRequest(1)
  }, [makeRequest])

  return data !== null ? (
    <Table<TableData>
      headerData={headerData}
      data={data}
      startConfig={{
        direction: 'ascending',
        indexer: 'name',
      }}
    />
  ) : (
    <DotsLoader color={dotsColor} />
  )
}

export default SortableTable
