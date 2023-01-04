import {
  Button,
  Input,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Table,
  Text,
} from '@mantine/core'
import React, { useCallback } from 'react'
import { Transaction } from '../types'
import { spliceToNew } from '../utils'

export type TransactonEditorProps = Readonly<{
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  transactions: Transaction[]
  users: string[]
}>

export const TransactonEditor: React.FC<TransactonEditorProps> = ({
  setTransactions,
  transactions,
  users,
}) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => e.preventDefault(),
    [],
  )

  const onTransactionItemChange = useCallback((i: number, v: string) => {
    setTransactions((t) => spliceToNew(t, i, 1, { ...t[i], item: v }))
  }, [])

  const onTransactionBuyerChange = useCallback((i: number, v: string) => {
    setTransactions((t) => spliceToNew(t, i, 1, { ...t[i], buyer: v }))
  }, [])

  const onTransactionPriceChange = useCallback((i: number, v: number) => {
    setTransactions((t) =>
      spliceToNew(t, i, 1, {
        ...t[i],
        price: v,
      }),
    )
  }, [])

  const onTransactionQuantityChange = useCallback((i: number, v: number) => {
    setTransactions((t) =>
      spliceToNew(t, i, 1, {
        ...t[i],
        quantity: v,
      }),
    )
  }, [])

  const onTransactionExemptionChange = useCallback((i: number, v: string[]) => {
    setTransactions((t) =>
      spliceToNew(t, i, 1, {
        ...t[i],
        exemptions: v,
      }),
    )
  }, [])

  const onTransactionRemoveClick = useCallback((i: number) => {
    setTransactions((t) => spliceToNew(t, i, 1))
  }, [])

  const onTransactionAddClick = useCallback(
    () =>
      setTransactions((t) => [
        ...t,
        { item: '', buyer: '', price: 0, quantity: 1, exemptions: [] },
      ]),
    [],
  )

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Table striped={true}>
          <thead>
            <tr>
              <th>No.</th>
              <th>品目</th>
              <th>支払った人</th>
              <th>単価</th>
              <th style={{ width: '5rem' }}>個数</th>
              <th style={{ width: '5rem' }}>計</th>
              <th>支払い免除</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={`transactions-${i}`}>
                <td>
                  <Text ml={5}>{i + 1}</Text>
                </td>
                <td>
                  <Input
                    value={t.item}
                    onChange={(e) => onTransactionItemChange(i, e.target.value)}
                  />
                </td>
                <td>
                  <Select
                    value={t.buyer}
                    onChange={(v) => onTransactionBuyerChange(i, v ?? '')}
                    data={users}
                  />
                </td>
                <td>
                  <Input
                    value={t.price}
                    type="number"
                    onChange={(e) =>
                      onTransactionPriceChange(i, parseInt(e.target.value, 10))
                    }
                  />
                </td>
                <td>
                  <NumberInput
                    value={t.quantity}
                    type="number"
                    min={1}
                    step={1}
                    onChange={(v) => onTransactionQuantityChange(i, v ?? 1)}
                  />
                </td>
                <td>{t.price * t.quantity}</td>
                <td>
                  <MultiSelect
                    multiple={true}
                    value={t.exemptions}
                    onChange={(v) => onTransactionExemptionChange(i, v)}
                    data={users}
                  />
                </td>
                <td>
                  <Button onClick={() => onTransactionRemoveClick(i)}>×</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={onTransactionAddClick}>＋</Button>
      </Stack>
    </form>
  )
}
