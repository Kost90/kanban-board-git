import type { RenderOptions } from "@testing-library/react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { PropsWithChildren, ReactElement } from "react"
import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"
import type { AppStore, RootState } from "../app/store"
import { makeStore } from "../app/store"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  chakraProviderProps?: Record<string, any>
}

export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = makeStore(preloadedState),
    chakraProviderProps = { resetCSS: true },
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ChakraProvider {...chakraProviderProps}>{children}</ChakraProvider>
    </Provider>
  )

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
