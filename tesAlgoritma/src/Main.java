
import java.util.HashMap;
import java.util.Scanner;

//NO 1
public class Main {

        public static void no1() {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Masukkan string yang ingin dibalik hurufnya (dengan angka di akhir): ");
            String input = scanner.nextLine(); // Membaca input pengguna
            String result = StringReverse.reverseLetters(input);
            System.out.println("Hasil: " + result);
        }

        public static void no2() {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Input kalimat untuk mencari kata terpanjang: ");
            String kalimat = scanner.nextLine();
            String longestWordResult = longestWord.longestWord(kalimat);
            System.out.println("Kata terpanjang: " + longestWordResult);
        }

        public static void no3 () {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Masukkan jumlah kata dalam INPUT: ");
            int inputSize = scanner.nextInt();
            scanner.nextLine(); // Membersihkan newline

            String[] inputArray = new String[inputSize];
            System.out.println("Masukkan kata-kata dalam INPUT:");
            for (int i = 0; i < inputSize; i++) {
                inputArray[i] = scanner.nextLine();
            }

            System.out.print("Masukkan jumlah kata dalam QUERY: ");
            int querySize = scanner.nextInt();
            scanner.nextLine(); // Membersihkan newline

            String[] queryArray = new String[querySize];
            System.out.println("Masukkan kata-kata dalam QUERY:");
            for (int i = 0; i < querySize; i++) {
                queryArray[i] = scanner.nextLine();
            }

            // Hitung berapa kali kata dalam QUERY terdapat di INPUT
            int[] queryResult = hitung.hitung(inputArray, queryArray);
            System.out.println("Hasil QUERY:");
            for (int count : queryResult) {
                System.out.println(count);
            }
        }

        public static void no4 () {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Masukkan ukuran matriks NxN: ");
            int n = scanner.nextInt();
            int[][] matrix = new int[n][n];

            System.out.println("Masukkan elemen-elemen matriks:");
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = scanner.nextInt();
                }
            }

            int diagonalDiff = diagonalDifference.diagonalDifference(matrix);
            System.out.println("Selisih diagonal: " + diagonalDiff);
        }

        public static void main (String[]args){
            // Panggil fungsi sesuai kebutuhan
//            no1();
//             no2();
             no3();
            // no4();
        }
}