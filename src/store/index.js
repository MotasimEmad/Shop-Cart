import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop.js'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        products: [],
        cart: [],
        checkStatus: null

    },

    getters: {

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                }
            })
        },

        productInStock() {
            return (product) => {
                return product.inventory > 0
            }
        },

        avilableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        }, 
        
    },

    actions: {

        fetchProducts(context) {
            return new Promise((resolve) => {
                shop.getProducts(products => {
                    context.commit('setProducts', products)
                    resolve()
                })
            })
        },

        addProductToCart(context, product) {
            if (context.getters.productInStock(product)) {
                // check if item already in cart
                const cartItem = context.state.cart.find(item => item.id === product.id)
                if (!cartItem) {
                    context.commit('pushItemToCart', product.id)
                } else {
                    context.commit('incrementItemQuantitay', cartItem)
                }
                    context.commit('decrementItemInventory', product)
            }
        },
        
        check({state, commit}) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckStatus', 'success')
                },
                () => {
                    commit('setCheckStatus', 'fail')
                }
            )
        }
    },

    mutations: {

        setProducts(state, products) {
            state.products = products
        },

        decrementItemInventory(state, product) {
            product.inventory--
        },

        pushItemToCart(state, productId) {
            state.cart.push({
                id: productId,
                qty: 1
            })
        }, 

        incrementItemQuantitay(state, cart) {
            cart.qty++
        },

        setCheckStatus(state, status) {
            state.checkStatus = status
        },

        emptyCart(state) {
            state.cart = []
        }
        
    }

})