import { Component, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,


  ) { }
  ngOnInit(): void {
    this.loadCart();
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/checkout.js';
    this.renderer.appendChild(document.body, script);
  }

  
  loadCart() {
    // Gọi phương thức để lấy tất cả các mục trong giỏ hàng
    this.cartService.getAllCartItems().subscribe((data: any) => {
      this.cartItems = data;
      // Lặp qua danh sách các mục để lấy thông tin sách cho từng mục
      this.cartItems.forEach((cartItem) => {
        this.cartService.getBookInfoByCartItemID(cartItem.id).subscribe((bookInfo: any) => {
          // Lưu thông tin sách vào thuộc tính bookInfo của mục
          cartItem.bookInfo = bookInfo;
          cartItem.totalPrice = cartItem.bookInfo.Price * cartItem.Quantity;
          this.updateTotalPrice();
          this.updateTotalQuantity();
      });
    });
});
}
updateTotalQuantity() {
  this.totalQuantity = 0;
  for (const cartItem of this.cartItems) {
    if (cartItem.Quantity) {
      this.totalQuantity += cartItem.Quantity;
    }
  }
}


updateTotalPrice() {
  this.totalPrice = 0;
  for (const cartItem of this.cartItems) {
    if (cartItem.bookInfo && cartItem.Quantity) {
      this.totalPrice += cartItem.totalPrice;
    }
  }
}
}
