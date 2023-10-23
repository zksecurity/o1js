/**
 * Wrapper file for various gadgets, with a namespace and doccomments.
 */
import { rangeCheck64 } from './range-check.js';
import { rot, leftShift, rightShift } from './rot.js';
import { Field } from '../core.js';

export { Gadgets };

const Gadgets = {
  /**
   * Asserts that the input value is in the range [0, 2^64).
   *
   * This function proves that the provided field element can be represented with 64 bits.
   * If the field element exceeds 64 bits, an error is thrown.
   *
   * @param x - The value to be range-checked.
   *
   * @throws Throws an error if the input value exceeds 64 bits.
   *
   * @example
   * ```ts
   * const x = Provable.witness(Field, () => Field(12345678n));
   * rangeCheck64(x); // successfully proves 64-bit range
   *
   * const xLarge = Provable.witness(Field, () => Field(12345678901234567890123456789012345678n));
   * rangeCheck64(xLarge); // throws an error since input exceeds 64 bits
   * ```
   *
   * **Note**: Small "negative" field element inputs are interpreted as large integers close to the field size,
   * and don't pass the 64-bit check. If you want to prove that a value lies in the int64 range [-2^63, 2^63),
   * you could use `rangeCheck64(x.add(1n << 63n))`.
   */
  rangeCheck64(x: Field) {
    return rangeCheck64(x);
  },

  /**
   * A (left and right) rotation is similar to the shift operation, `<<` and `>>` in JavaScript, just that bits are being appended to the other side.
   * `direction` is a string which accepts either `'left'` or `'right'`, defining the direction of the rotation.
   *
   * **Note:** You can not rotate {@link Field} elements that exceed 64 bits. For elements that exceed 64 bits this operation will fail.
   *
   * @param field {@link Field} element to rotate.
   * @param bits amount of bits to rotate this {@link Field} element with.
   * @param direction left or right rotation direction.
   *
   * @throws Throws an error if the input value exceeds 64 bits.
   *
   * @example
   * ```ts
   * const x = Provable.witness(Field, () => Field(12));
   * const y = rot(x, 2, 'left'); // left rotation by 2 bits
   * const z = rot(x, 2, 'right'); // right rotation by 2 bits
   * y.assertEquals(48);
   * z.assertEquals(3)
   *
   * const xLarge = Provable.witness(Field, () => Field(12345678901234567890123456789012345678n));
   * rot(xLarge, 32, "left"); // throws an error since input exceeds 64 bits
   * ```
   */
  rot(field: Field, bits: number, direction: 'left' | 'right' = 'left') {
    return rot(field, bits, direction);
  },

  /**
   * Performs a left shift operation on the provided {@link Field} element.
   * This is akin to the `<<` shift operation in JavaScript, where bits are moved to the left.
   * The `leftShift` function uses the rotation method internally to achieve this operation.
   *
   * **Note:** You cannot shift {@link Field} elements that exceed 64 bits.
   * For elements that exceed 64 bits, this operation will fail.
   *
   * @param field {@link Field} element to shift.
   * @param bits Amount of bits to shift the {@link Field} element to the left.
   *
   * @throws Throws an error if the input value exceeds 64 bits.
   *
   * @example
   * ```ts
   * const x = Provable.witness(Field, () => Field(12));
   * const y = leftShift(x, 2); // left shift by 2 bits
   * y.assertEquals(48);
   *
   * const xLarge = Provable.witness(Field, () => Field(12345678901234567890123456789012345678n));
   * leftShift(xLarge, 32); // throws an error since input exceeds 64 bits
   * ```
   */
  leftShift(field: Field, bits: number) {
    return leftShift(field, bits);
  },

  /**
   * Performs a right shift operation on the provided {@link Field} element.
   * This is similar to the `>>` shift operation in JavaScript, where bits are moved to the right.
   * The `rightShift` function utilizes the rotation method internally to implement this operation.
   *
   * **Note:** You cannot shift {@link Field} elements that exceed 64 bits.
   * For elements that exceed 64 bits, this operation will fail.
   *
   * @param field {@link Field} element to shift.
   * @param bits Amount of bits to shift the {@link Field} element to the right.
   *
   * @throws Throws an error if the input value exceeds 64 bits.
   *
   * @example
   * ```ts
   * const x = Provable.witness(Field, () => Field(48));
   * const y = rightShift(x, 2); // right shift by 2 bits
   * y.assertEquals(12);
   *
   * const xLarge = Provable.witness(Field, () => Field(12345678901234567890123456789012345678n));
   * rightShift(xLarge, 32); // throws an error since input exceeds 64 bits
   * ```
   */
  rightShift(field: Field, bits: number) {
    return rightShift(field, bits);
  },
};
