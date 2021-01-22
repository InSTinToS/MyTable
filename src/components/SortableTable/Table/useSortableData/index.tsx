import { useState } from 'react'

export interface ConfigType<ItemData> {
  indexer: keyof ItemData
  direction: 'ascending' | 'descending'
}

interface useSortableDataProps<ItemData> {
  items: ItemData[] | undefined
  config: ConfigType<ItemData>
}

function useSortableData<ItemData>({ items, config }: useSortableDataProps<ItemData>) {
  const [sortConfig, setSortConfig] = useState(config)

  if (items === undefined) return { items: undefined, sort: undefined, sortConfig: undefined }

  const sortedItems = (): ItemData[] => {
    const sortableItems = [...items]

    sortableItems.sort((a, b) => {
      const valueA = a[sortConfig.indexer]
      const valueB = b[sortConfig.indexer]

      if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1
      if (valueA > valueB) return sortConfig.direction === 'descending' ? -1 : 1
      return 0
    })

    return sortableItems
  }

  const sort = (indexerToSort: keyof ItemData) => {
    sortConfig.direction === 'ascending'
      ? setSortConfig({
          indexer: indexerToSort,
          direction: 'descending',
        })
      : setSortConfig({
          indexer: indexerToSort,
          direction: 'ascending',
        })
  }

  return { items: sortedItems(), sort, sortConfig }
}

export default useSortableData
