impl MyType {}

impl MyType<A> {}

impl MyType<A, B> {}

impl MyType {
    fn method(self) {}

    fn method(mut self) {}

    fn method(&mut self) {}
}

impl MyType {
fn method(self) {}
}

impl MyType {
            fn method(self) {}
}

impl<T> MyStruct<T> where T: MyEq {
fn my_eq(self, other: Self) -> bool {
        (self.a == other.a) & self.b.my_eq(other.b)
    }
}
