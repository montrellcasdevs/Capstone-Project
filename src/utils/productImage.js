const localImageVersion = Date.now();

function withCacheVersion(path){
    if(path?.startsWith("/assets/images/")){
        return `${path}?v=${localImageVersion}`;
    }

    return path;
}

export function getPrimaryProductImage(product){
    if(product?.id){
        return withCacheVersion(`/assets/images/${product.id}.jpg`);
    }

    if(product?.image_local){
        return withCacheVersion(product.image_local);
    }

    if(product?.poster){
        return product.poster;
    }

    return "";
}

export function handleProductImageError(event, product){
    const image = event.currentTarget;
    const jpgFallback = product?.id ? withCacheVersion(`/assets/images/${product.id}.jpg`) : "";
    const localFallback = product?.image_local ? withCacheVersion(product.image_local) : "";
    const posterFallback = product?.poster || "";

    if(!image.dataset.localTried && localFallback){
        image.dataset.localTried = "true";
        image.src = localFallback;
        return;
    }

    if(!image.dataset.jpgTried && jpgFallback){
        image.dataset.jpgTried = "true";
        image.src = jpgFallback;
        return;
    }

    if(!image.dataset.posterTried && posterFallback){
        image.dataset.posterTried = "true";
        image.src = posterFallback;
    }
}
