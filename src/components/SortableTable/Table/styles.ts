import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  flex-direction: column;

  color: #fcfcfc;

  input {
    height: 32px;
    border-radius: 8px;
    padding-left: 16px;
    margin: 24px 0;

    background-color: transparent;
    border: solid 1px #fcfcfc;
    color: #fcfcfc;

    &::placeholder {
      color: #fcfcfc;
    }
  }

  table {
    border-collapse: collapse;

    tr {
      th,
      td {
        height: 32px;
        width: 400px;
      }
    }

    thead {
      th {
        text-align: left;

        cursor: pointer;

        div {
          user-select: none;

          .Icon {
            width: 12px;
            margin-right: 8px;

            fill: #fcfcfc;
          }
        }
      }
    }

    tbody {
      tr:hover {
        background-color: ${darken(0.1, '#6e4850')};

        cursor: pointer;
      }
    }

    td:first-child,
    th:first-child {
      padding-left: 24px;
    }

    td:last-child,
    th:last-child {
      padding-right: 24px;
      text-align: right;
    }
  }
`

export default Style
