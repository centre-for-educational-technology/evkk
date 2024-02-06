export default function ErrorTable({ errorData }) {
  return <pre>{JSON.stringify(errorData[0], null, 2)}</pre>;
}
