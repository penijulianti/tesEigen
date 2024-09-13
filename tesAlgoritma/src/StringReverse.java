import java.lang.StringBuilder;
//    no 1
public class StringReverse{
    public static String reverseLetters(String input){
        String huruf = input.replaceAll("[0-9]","");
        String angka = input.replaceAll("[^0-9]","");

        String reversedLetters = new StringBuilder(huruf).reverse().toString();

        return  reversedLetters + angka;
    }
}