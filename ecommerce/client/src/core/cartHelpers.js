export const addItem = (item, next) => {
  //item is the product
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });

    //For removing duplicates - build an array from new Set and turn it back into array using array.from
    // So that later we can remap it
    // new set will only allow unique values in it
    // so pass the ids of each object/products
    // if the loop tries to add the same value again, it will get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};

/**
 * For Wishlist
 */

export const addWishItem = (item, next) => {
  //item is the product
  let wish = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("wish")) {
      wish = JSON.parse(localStorage.getItem("wish"));
    }
    wish.push({
      ...item,
      count: 1,
    });

    //For removing duplicates - build an array from new Set and turn it back into array using array.from
    // So that later we can remap it
    // new set will only allow unique values in it
    // so pass the ids of each object/products
    // if the loop tries to add the same value again, it will get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart

    wish = Array.from(new Set(wish.map((p) => p._id))).map((id) => {
      return wish.find((p) => p._id === id);
    });
    localStorage.setItem("wish", JSON.stringify(wish));
    next();
  }
};

export const itemWishTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("wish")) {
      return JSON.parse(localStorage.getItem("wish")).length;
    }
  }
  return 0;
};

export const getWishlist = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("wish")) {
      return JSON.parse(localStorage.getItem("wish"));
    }
  }
  return [];
};

export const removeWishItem = (productId) => {
  let wish = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("wish")) {
      wish = JSON.parse(localStorage.getItem("wish"));
    }

    wish.map((product, i) => {
      if (product._id === productId) {
        wish.splice(i, 1);
      }
    });

    localStorage.setItem("wish", JSON.stringify(wish));
  }
  return wish;
};

/**
 * For Comparelist
 */

export const addCompareItem = (item, next) => {
  //item is the product
  let compare = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("compare")) {
      compare = JSON.parse(localStorage.getItem("compare"));
    }
    compare.push({
      ...item,
      count: 1,
    });

    //For removing duplicates - build an array from new Set and turn it back into array using array.from
    // So that later we can remap it
    // new set will only allow unique values in it
    // so pass the ids of each object/products
    // if the loop tries to add the same value again, it will get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart

    compare = Array.from(new Set(compare.map((p) => p._id))).map((id) => {
      return compare.find((p) => p._id === id);
    });
    localStorage.setItem("compare", JSON.stringify(compare));
    next();
  }
};

export const itemCompareTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("compare")) {
      return JSON.parse(localStorage.getItem("compare")).length;
    }
  }
  return 0;
};

export const getCompareList = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("compare")) {
      return JSON.parse(localStorage.getItem("compare"));
    }
  }
  return [];
};

export const removeCompareItem = (productId) => {
  let compare = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("compare")) {
      compare = JSON.parse(localStorage.getItem("compare"));
    }

    compare.map((product, i) => {
      if (product._id === productId) {
        compare.splice(i, 1);
      }
    });

    localStorage.setItem("compare", JSON.stringify(compare));
  }
  return compare;
};
