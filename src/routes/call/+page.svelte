<script lang="ts">
    const date = new Date().toLocaleDateString('en-US');
</script>



<form method="POST" class="flex justify-center">
    <input type="hidden" name="date" value={date} />
    <input type="tel" name="phoneNumber" placeholder="Phone Number" />
    <button type="submit">Make Call</button>
</form>