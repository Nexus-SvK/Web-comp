if (!this.promise) {
  this.promise = this.someTest();
  this.promise
    .catch(() => {})
    .then(() => {
      this.promise.done = true;
    });
  retVal = true;
}

if (this.promise.done) {
  this.promise = this.someTest();
  this.promise
    .catch(() => {})
    .then(() => {
      this.promise.done = true;
    });
  retVal = true;
}
