public class diagonalDifference {

    public static int diagonalDifference(int[][] matrix) {
        int n = matrix.length;
        int primaryDiagonal = 0;
        int secondaryDiagonal = 0;

        for (int i = 0; i < n; i++) {
            primaryDiagonal += matrix[i][i]; // Diagonal utama (kiri ke kanan)
            secondaryDiagonal += matrix[i][n - i - 1]; // Diagonal sekunder (kanan ke kiri)
        }

        // Mengembalikan nilai selisih absolut antara dua diagonal
        return Math.abs(primaryDiagonal - secondaryDiagonal);
    }
}
