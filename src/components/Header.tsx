import SearchForm from "./SearchForm"
import BreadCrumb from "./ui/BreadCrumb"

function Header() {
  return (
    <header data-testid="header">
      <SearchForm />
      <BreadCrumb />
    </header>
  )
}

export default Header
